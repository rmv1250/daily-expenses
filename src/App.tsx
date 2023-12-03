import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/home/Home.tsx";
import ViewExpensePage from "./pages/expense/view/ViewExpense.tsx";
import DashboardExpensesPage from "./pages/expense/dashboard/DashboardExpenses.tsx";
import EditExpensePage from "./pages/expense/edit/EditExpense.tsx";
import AddExpensePage from "./pages/expense/add/AddExpense.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import SettingsPage from "./pages/settings/Settings.tsx";
import ReportsPage from "./pages/reports/Reports.tsx";
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import addExpenseAction from "./utils/actions/addExpenseAction.tsx";
import expenseApiLoader from "./api/expenseApiLoader.ts";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchCategoriesThunk} from "./store/businessCategorySlice.ts";
import {fetchSettingsThunk} from "./store/settingsSlice.ts";
import ErrorPage from "./pages/error/Error.tsx";


const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout/>, errorElement: <ErrorPage />, children: [
      {index: true, element: <HomePage/>, loader: expenseApiLoader},
      {
        path: 'expenses', children: [
          {index: true, element: <DashboardExpensesPage/>, loader: expenseApiLoader},
          {path: 'reports', element: <ReportsPage/>, loader: expenseApiLoader},
          {path: 'add', element: <AddExpensePage/>, action: addExpenseAction},
          {
            path: ':id', id: "expense-id", loader: expenseApiLoader, children: [
              {index: true, element: <ViewExpensePage/>, loader: expenseApiLoader},
              {path: 'edit', element: <EditExpensePage/>, loader: expenseApiLoader}
            ]
          },

        ],
      },
      {
        path: 'settings', element: <SettingsPage/>
      },
    ]
  }
])

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-expect-error type
    dispatch(fetchCategoriesThunk());
    // @ts-expect-error type
    dispatch(fetchSettingsThunk());
  }, [dispatch])

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router}/>
      </LocalizationProvider>
  )
}

export default App
