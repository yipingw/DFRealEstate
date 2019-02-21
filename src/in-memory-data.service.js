export var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var estate = {
            id: 1,
            room_number: "赤峰苑1栋1单元1813室",
            cost_amount: 133,
            balance: 0.13,
            last_bill_date: '2016年8月',
            bill_date: '2016年12月',
            bill_date_num: 1,
            money: 120 // 缴费金额
        };
        return { estate: estate };
    };
    return InMemoryDataService;
}());
//# sourceMappingURL=in-memory-data.service.js.map