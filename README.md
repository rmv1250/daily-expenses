
# Razvan-Marian Vlasceanu
- rmvlasceanu at gmail.com

# Some next steps and known issues
Not exactly in this order
- call api to update default categories based on settings along with new expense creation or while updating new one
- extract constant values to separate files or `.env`
- add more specific error handling
- add currency exchange support
- add translations
- add unit tests
- replace img url for new receipt with a file browser
- redesign dashboard for mobile support
- treat floating point numbers aberrations
- optimise router loaders
- make summary screen configurable from settings with more card options
- reports screen could use better charts
- adding loading screens
- file structure cleanup, some models and components are not in the right place at the moment
- dashboard pagination and filter should use api
- dashboard filter can be improved to search entire table not a specific column
- some of the components should be split into smaller parts



# DB generator script - https://json-generator.com/
```js
[
  '{{repeat(30, 30)}}',
  {
    id: '{{index()}}',
    title: '{{lorem(3, "words")}}',
    amount: '{{floating(1, 100, 2)}}',
    currency: '{{random("CHF", "CHF", "CHF", "CHF", "EUR", "USD", "GBP", "RON")}}',
    category: '{{random("fashion", "food", "leisure", "sport", "transportation")}}',
    transactionDate: '{{date(new Date(random(2021, 2022, 2023), 0, 1), new Date(), "D/MM/YYYY")}}',
    recipient: '{{company()}}',
    tags: [
      '{{repeat(random(0,1,2,3,4)}}',
      '{{lorem(1, "words")}}'
    ],
    receiptUrl: '{{"https://picsum.photos/400/200?random=" + index()}}',
    location: '{{city()}}',
    comments: '{{lorem(integer(3, 10), "words")}}',
  }
]
```