import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {Stack} from "@mui/material";
import SummaryCard, {SummaryCardListItem} from "../../components/summary/SummaryCard.tsx";
import {useLoaderData, useNavigate} from "react-router-dom";
import {IExpense} from "../../models/IExpense.ts";
import {expensesToListItems, filterExpenses, reduceListItems} from "../../utils/summaryHelpers.ts";
import * as dayjs from "dayjs";
import getExpenseComparator from "../../utils/expenseTableComparators.ts";
import {useDispatch} from "react-redux";
import {filterAction} from "../../store/filterSlice.ts";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const expenses = useLoaderData() as IExpense[];
  const todayExpenses = filterExpenses(expenses, dayjs().format('D/MM/YYYY'), dayjs().format('D/MM/YYYY'));
  const monthExpenses = filterExpenses(expenses, dayjs().format('01/MM/YYYY'), dayjs().format('31/MM/YYYY'))
  const recentExpense: IExpense = JSON.parse(JSON.stringify(expenses)).sort(getExpenseComparator('id'))[0];

  const todaySummary: SummaryCardListItem[] = reduceListItems(expensesToListItems(todayExpenses, 'currency'));
  const monthSummary: SummaryCardListItem[] = reduceListItems(expensesToListItems(monthExpenses, 'currency'));
  const topRecipientsSummary: SummaryCardListItem[] = reduceListItems(expensesToListItems(expenses, 'recipient'))
  .sort((a, b) => parseFloat(b.label) - parseFloat(a.label))
  .slice(0, 5);
  const mostRecentExpenseSummary: SummaryCardListItem[] = [
    {heading: recentExpense.title, label: ''},
    {heading: recentExpense.transactionDate, label: ''},
    {heading: recentExpense.currency, label: recentExpense.amount.toString()},
  ]

  if (recentExpense.category) {
    mostRecentExpenseSummary.push({
      heading: 'Category', label: recentExpense.category
    })
  }

  if (recentExpense.recipient) {
    mostRecentExpenseSummary.push({
      heading: 'Recipient', label: recentExpense.recipient
    })
  }

  function handleMostRecentClick() {
    navigate('expenses/' + recentExpense.id);
  }

  function handleViewDashboardWithFilter(filter: string, columnId: keyof IExpense) {
    // const todayFilterValue = dayjs().format('D/MM/YYYY');
    dispatch(filterAction.set({value: filter, columnId}))
    navigate('expenses');
  }

  function handleViewAllRecipients() {
    const recipientFilterText = topRecipientsSummary.map(item => (item.heading === 'N/A' ? '' : item.heading)).join(', ')
    handleViewDashboardWithFilter(recipientFilterText, 'recipient');
  }

  return (
      <Container maxWidth="lg" sx={{p: 2}}>
        <Typography variant="h5" sx={{mb: 2}}>
          Expense summary
        </Typography>
        <Stack direction="row" display="flex" gap={2} flexWrap="wrap">
          {mostRecentExpenseSummary.length > 0 && (
              <SummaryCard
                  title="Recent added"
                  items={mostRecentExpenseSummary}
                  action={handleMostRecentClick}
                  actionTitle={'View details'}
              />
          )
          }

          {todaySummary.length > 0 && (
              <SummaryCard
                  title="Today"
                  items={todaySummary}
                  actionTitle='Today expenses'
                  action={() => handleViewDashboardWithFilter(dayjs().format('D/MM/YYYY'), 'transactionDate')}
              />
          )
          }
          {monthSummary.length > 0 && (
              <SummaryCard
                  title={"This month"}
                  items={monthSummary}
                  actionTitle="Current month expenses"
                  action={() => handleViewDashboardWithFilter(dayjs().format('MM/YYYY'), 'transactionDate')}
              />
          )
          }
          {topRecipientsSummary.length > 0 && (
              <SummaryCard
                  title={"Top recipients"}
                  items={topRecipientsSummary}
                  actionTitle="View all expenses"
                  action={handleViewAllRecipients}
              />)
          }
        </Stack>
      </Container>
  )
}

export default HomePage;