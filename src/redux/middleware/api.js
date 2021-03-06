import { FAILURE, REQUEST, SUCCESS } from '../constants';

export default (stare) => (next) => async (action) => {
  if (!action.CallAPI) return next(action);

  const { CallAPI, type, ...rest } = action;

  next({ ...rest, type: type + REQUEST });

  try {
    const response = await fetch(CallAPI).then((res) => res.json());
    next({ ...rest, type: type + SUCCESS, response });
  } catch (error) {
    next({ ...rest, type: type + FAILURE, error });
  }
};
