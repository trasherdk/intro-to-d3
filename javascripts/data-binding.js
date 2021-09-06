(() => {
    /* Simple transition examples */
    var days = [],
        maxCount = 0;

    d3.selectAll('.ex-2 .example-source table').each(() => {
        var table = d3.select(this),
            data = [];

        table.selectAll('tbody tr').each(() => {
            var row = d3.select(this),
                product = null,
                count = null;

            row.selectAll('td').each((d, i) => {
                var td = d3.select(this);
                if (i == 0) {
                    product = td.text();
                } else {
                    count = parseInt(td.text());
                    maxCount = Math.max(count, maxCount);
                }
            });

            data.push({
                product: product,
                count: count
            });
        })

        days.push(data);
    });

    var sales = days[0];

    var width = 300,
        height = 75;

    var x = d3.scaleLinear()
        .range([0, 300])
        .domain([0, maxCount]);
    var y = d3.scaleBand()
        .range([0, height])
        .domain(sales.map((d, i) => d.product));

    (() => {
        /* Plain example, jump transition */
        var sales = days[0];

        var svg = d3.select('.ex-2 .example-result svg')

        d3.select('.ex-2 .toggle').on('click', () => {
            sales = (sales == days[0]) ? days[1] : days[0];
            update();
        })

        function update() {
            var rects = svg.selectAll('rect')
                .data(sales, (d, i) => d.product);

            // When we enter, we add the DOM element
            // and set up the things that won't change
            var enterRects = rects.enter()
                .append('rect')
                .attr('x', x(0))
                .attr('y', (d, i) => y(d.product))
                .attr('height', y.bandwidth())

            // "rects" represents the update selection, we need to
            // manually merge it with the enter selection to update
            // all rects at the same time
            rects.merge(enterRects)
                .attr('width', (d, i) => x(d.count));
        };

        update();
    })();

    (() => {
        /* Fancy example, smooth transition */
        var sales = days[0];

        var svg = d3.select('.ex-3 .example-result svg');

        d3.select('.ex-3 .toggle').on('click', () => {
            sales = (sales == days[0]) ? days[1] : days[0];
            update();
        })

        function update() {
            var rects = svg.selectAll('rect')
                .data(sales, (d, i) => d.product);

            // When we enter, we add the DOM element
            // and set up the things that won't change
            var enterRects = rects.enter()
                .append('rect')
                .attr('x', x(0))
                .attr('y', (d, i) => y(d.product))
                .attr('height', y.bandwidth())
                .attr('width', (d, i) => x(d.count));

            rects.merge(enterRects).transition()
                .duration(1000)
                .attr('width', (d, i) => x(d.count));
        };

        update();
    })();
})();