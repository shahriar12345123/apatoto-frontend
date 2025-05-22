import * as React from "react";

const TOAST_LIMIT = 10;
const TOAST_REMOVE_DELAY = 6000; // 

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const toastTimeouts = new Map();
const listeners = [];

function dispatch(action) {
  listeners.forEach((listener) => listener(action));
}

function toast({
  variant = "default",
  title,
  description,
  action,
  ...props
}) {
  const id = genId();

  const update = (updateProps) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...updateProps, id },
    });

  const dismiss = () =>
    dispatch({
      type: actionTypes.DISMISS_TOAST,
      toastId: id,
    });

  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      id,
      variant,
      title,
      description,
      action,
      open: true, // নিশ্চিত করছি টোস্ট শুরুতেই open থাকবে
      ...props,
    },
  });

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState([]);

  React.useEffect(() => {
    function handleChange(action) {
      switch (action.type) {
        case actionTypes.ADD_TOAST:
          setState((current) => {
            if (current.length >= TOAST_LIMIT) {
              // পুরানো টোস্ট ডিসমিস করো
              dispatch({
                type: actionTypes.DISMISS_TOAST,
                toastId: current[0].id,
              });
            }
            return [...current, action.toast];
          });
          break;

        case actionTypes.UPDATE_TOAST:
          setState((current) =>
            current.map((t) =>
              t.id === action.toast.id ? { ...t, ...action.toast } : t
            )
          );
          break;

        case actionTypes.DISMISS_TOAST:
          setState((current) =>
            current.map((t) =>
              action.toastId ? (t.id === action.toastId ? { ...t, open: false } : t) : { ...t, open: false }
            )
          );
          break;

        case actionTypes.REMOVE_TOAST:
          setState((current) =>
            action.toastId
              ? current.filter(({ id }) => id !== action.toastId)
              : []
          );
          break;

        default:
          break;
      }
    }

    listeners.push(handleChange);

    return () => {
      const index = listeners.indexOf(handleChange);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  React.useEffect(() => {
    state.forEach((toast) => {
      if (toast.open === false && !toastTimeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          dispatch({
            type: actionTypes.REMOVE_TOAST,
            toastId: toast.id,
          });
          toastTimeouts.delete(toast.id);
        }, TOAST_REMOVE_DELAY);

        toastTimeouts.set(toast.id, timeout);
      }
    });

    return () => {
      toastTimeouts.forEach(clearTimeout);
      toastTimeouts.clear();
    };
  }, [state]);

  return {
    toasts: state,
    toast,
    dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

export { useToast, toast };
