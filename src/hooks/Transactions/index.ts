import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction, getTransactions, postTransactions, updateTransaction } from "../../redux/actions/transactions";
import { RootState, Transactions } from "../../interfaces";
import { closeLoading, loading } from "../../redux/actions/loading/loading";

export function useTransactions() {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions);

  async function set(data: any): Promise<any> {
    dispatch(loading());
    await dispatch<any>(postTransactions(data))
    dispatch(closeLoading());
  }

  async function get(from: string, to: string, linked: string): Promise<any> {
    dispatch(loading());
    await dispatch<any>(getTransactions(from, to, linked));
    dispatch(closeLoading())
  }

  async function update(transaction: Transactions): Promise<any> {
    dispatch(loading());
    await dispatch<any>(updateTransaction(transaction));
    dispatch(closeLoading())
  }

  async function remove(transactionId: string): Promise<any> {
    dispatch(loading());
    await dispatch<any>(deleteTransaction(transactionId))
    dispatch(closeLoading());
  }

  return {
    data: transactions,
    set,
    get,
    update,
    remove,
  }
}