$(document).ready(function () {

    $(document).ready(function () {
        $('.sidenav').sidenav();
    });

    $('.dropdown-trigger').dropdown();

    displayFinancials('all')

    $(".finance-choice").on("click", function () {
        var id = $(this).attr('id')
        var upperCase = id[0].toUpperCase() + id.slice(1) + " " + completeLabel(id)
        $('#dropdown').text(upperCase)
        displayFinancials(id)
    })

    function completeLabel(id) {
        switch (id) {
            case "all":
                return "Financials"
            case "necessary":
                return "Expenses"
            case "unnecessary":
                return "Expenses"
            case "One":
                return "Time Purchases"
            default:
                return ""
        }
    }

    $(document).on("click", ".purchase-btn", function () {
        var id = $(this).attr("data-id")
        $.ajax({ method: "PUT", url: "/api/onetime-purchase/" + id, data: { date: moment().format("YYYYMMDD") } }).then(function (res) {
            location.reload()
        })
    })

    $(document).on("click", ".onetime-delete", function () {
        var id = $(this).attr("data-id")
        $.ajax({ method: "DELETE", url: "/api/onetime-purchase/" + id }).then(function () {
            location.reload()
        })
    })

    function displayFinancials(budgetType) {
        var financials = $('#financials')
        $(financials).empty()
        financials.hide()
        var oneTimePurchase = $('#oneTimePurchase');
        $(oneTimePurchase).empty()
        oneTimePurchase.hide()
        $.ajax({ method: "GET", url: "/api/all" }).then(function (res) {

            financialsArr = []

            if (budgetType === 'all' || budgetType === 'income') {
                for (const row of res.income) {
                    if (!row.endDate) {
                        var card = createCard(row, "income")
                        // $(financials).append(card)
                        financialsArr.push(card)
                        financials.show()
                    }
                }
            }

            if (budgetType === 'all' || budgetType === 'necessary') {
                for (const row of res.necessaryExpenses) {
                    if (!row.endDate) {
                        financialsArr.push((createCard(row, "necessary")))
                        financials.show()
                    }
                }
            }

            if (budgetType === 'all' || budgetType === 'unnecessary') {
                for (const row of res.unnecessaryExpenses) {
                    if (!row.endDate) {
                        financialsArr.push((createCard(row, "unnecessary")))
                        financials.show()
                    }
                }
            }

            financialsArr.sort((a, b) => Math.abs($(b).attr("data-amount")) - Math.abs($(a).attr("data-amount")))

            for (const card of financialsArr) {
                $(financials).append(card)
            }

            if (budgetType === 'all' || budgetType === "One") {
                var saving = 0;
                for (const row of res.income) {
                    if (!row.endDate) {
                        saving = saving + parseFloat(row.amount)
                    }
                }
                for (const row of res.necessaryExpenses) {
                    if (!row.endDate) {
                        saving = saving - parseFloat(row.amount)
                    }
                }
                for (const row of res.unnecessaryExpenses) {
                    if (!row.endDate) {
                        saving = saving - parseFloat(row.amount)
                    }
                }


                for (const row of res.oneTimePurchase) {
                    if (!row.date) {
                        $(oneTimePurchase).append(createOneTime(row, saving))
                        oneTimePurchase.show()
                    }
                }

            }
        })
    }

    function createOneTime(rowElement, savings) {
        var card = $(`<div class="card blue-grey lighten-3 onetime-card center-align" style="display: inline-block; margin-right: 2%" data-amount=${rowElement.amount}>`)
        var cardContent = $('<div class="card-content">')
        var cardTitle = $('<span class="card-title title-text">')
        cardTitle.text(rowElement.title)
        var purchaseCost = $('<p>')
        purchaseCost.text("Cost: $" + Math.ceil(rowElement.amount))
        var averageDailySavings = $('<p>')
        averageDailySavings.text("Current daily saving: $" + Math.ceil(savings))
        var suggestion = $('<p>')
        var cardButton = $(`<br><a style="margin-left:0" class="btn-flat black-text purchase-btn" data-id=${rowElement.id}>Make Purchase</a>`)
        var deleteButton = $(`<a class="btn-floating btn-small waves-effect waves-light blue-grey darken-4 onetime-delete" data-id=${rowElement.id}><i class="material-icons">clear</i></a>`)
        if (savings <= 0) {
            suggestion.text("Right now, you are not saving enough to make this purchase")
            suggestion.css("font-weight", "bold")
            cardButton.html("Make Purchase <span class='red-text' style='font-weight: bolder'>(Not Recommended)</span>")
        }
        else {
            var time = Math.ceil(rowElement.amount / savings)
            suggestion.text("You will save enough or this purchase after " + time + " day(s)")
        }
        cardContent.append(cardTitle)
        cardContent.append(purchaseCost)
        cardContent.append(averageDailySavings)
        cardContent.append(suggestion)
        cardContent.append(cardButton)
        card.append(cardContent)
        card.append(deleteButton)

        return card

    }

    function createCard(rowElement, budgetType) {

        if (budgetType === "income") {

            var card = $('<div class="card green lighten-4 financial-card" style="display: inline-block; margin-right: 2%">')
            var cardContent = $('<div class="card-content center-align">')
            var cardTitle = $('<span class="card-title title-text">')
            cardTitle.text(rowElement.title)
            var expenseType = $('<p>')
            expenseType.text("Income")
            var averageDailyCost = $('<p>')
            averageDailyCost.text("+ $" + Math.ceil(rowElement.amount) + " per day")
            cardContent.append(cardTitle)
            cardContent.append(expenseType)
            cardContent.append(averageDailyCost)
            card.append(cardContent)

        }

        else if (budgetType === "necessary") {
            var card = $('<div class="card red lighten-2 financial-card" style="display: inline-block; margin-right: 2%">')
            var cardContent = $('<div class="card-content center-align">')
            var cardTitle = $('<span class="card-title title-text">')
            cardTitle.text(rowElement.title)
            var expenseType = $('<p>')
            expenseType.text("Necessary Expense")
            var averageDailyCost = $('<p>')
            averageDailyCost.text("- $" + Math.ceil(rowElement.amount) + " per day")
            cardContent.append(cardTitle)
            cardContent.append(expenseType)
            cardContent.append(averageDailyCost)
            card.append(cardContent)


        }

        else if (budgetType === "unnecessary") {
            var card = $('<div class="card red lighten-2 financial-card" style="display: inline-block; margin-right: 2%">')
            var cardContent = $('<div class="card-content center-align">')
            var cardTitle = $('<span class="card-title title-text">')
            cardTitle.text(rowElement.title)
            var expenseType = $('<p>')
            expenseType.text("Unnecessary expense")
            var averageDailyCost = $('<p>')
            averageDailyCost.text("- $" + Math.ceil(rowElement.amount) + " per day")
            cardContent.append(cardTitle)
            cardContent.append(expenseType)
            cardContent.append(averageDailyCost)
            card.append(cardContent)



        }

        return card

    }

    function stripDateDashes(date) {
        return date.replace(/-/g, "")
    }

    function getDatesSince(startDate) {
        // startDate will already be stripped of dashes
        startDate = stripDateDashes(startDate)
        var stopDate = moment()
        var dateArray = [];
        var currentDate = moment(startDate)
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format("YYYYMMDD"))
            currentDate = moment(currentDate).add(1, 'days')
        }
        return dateArray

    }


    async function getBudgetData() {
        $.ajax({ method: "GET", url: "/api/user_data" }).then(function (res) {
            var startDate = res.startDate
            startDate = stripDateDashes(startDate)
            var dateArr = getDatesSince(startDate)
            var budgetHistory = []

            function makeCall(counter, expenseObj) {
                if (counter === dateArr.length) {
                    renderHistory(budgetHistory)
                }
                else {
                    date = dateArr[counter]
                    queryUrl = "/api/dailyBudget/" + date

                    $.ajax({ method: "POST", url: queryUrl, data: expenseObj }).then(function (result) {
                        budgetHistory.push(result)
                        counter++
                        makeCall(counter, expenseObj)
                    })

                }
            }

            $.ajax({ method: "GET", url: "/api/all" }).then(response => {
                var expenseObj = response
                for (key in expenseObj) {
                    var array = expenseObj[key]
                    expenseObj[key] = JSON.stringify(array)
                }

                makeCall(0, expenseObj)

            })
        })
    }

    function renderHistory(budgetHistory) {
        var xData = [0]
        var yData = [0]
        var xCounter = 1
        var yCounter = 0
        for (i = 0; i < 30; i++) {
            xData.push(xCounter),
                yCounter += budgetHistory[i].dailySaving
            yData.push(yCounter)
            xCounter++;
        }

        if (xData.length > 30) {
            xData = xData.slice(0, 30)
            yData = yData.slice(0, 30)
        }

        var data = {
            labels: xData,
            series: [yData]
        };

        var chart = new Chartist.Line('.ct-chart', data)

        chart.on("draw", function(context) {
            if (yCounter < 0) {
                context.element.attr({style: "stroke: red"})
            }
            else {
                context.element.attr({style: "stroke: green"})
            }
        })

        if (yCounter < 0) {
            $("#budget-suggestion").text(`Since you started using FinanChill, you have spent $${Math.ceil(Math.abs(yCounter))} more than you have saved. You may want to consider cutting back you spending.`)
        }
        else {
            $("#budget-suggestion").text(`Since you started using FinanChill, you have saved $${Math.floor(yCounter)}!`)
        }
    }

    getBudgetData()

});
