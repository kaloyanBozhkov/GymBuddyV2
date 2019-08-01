export default () => {
    $(document).on("click", "#myDopeTable > div", function () {
        if ($(this).attr("data-selected") == "open") {
            $(this).removeAttr("data-selected");
            $("#graphOldValuesDisplayer > div").slideUp(250, function () {
                $("#graphOldValuesDisplayer > div > p").show();
                $("#graphOldValuesDisplayer > div > div.row").hide();
                $("#graphOldValuesDisplayer > div").slideDown(250);
            });
        } else {
            $("#myDopeTable > div[data-selected='open']").removeAttr("data-selected");
            $(this).attr("data-selected", "open");
            let calories = {
                carbs: parseFloat((parseFloat($(this).data("values").calsCarbs) / 4).toFixed(2)),
                proteins: parseFloat((parseFloat($(this).data("values").calsProteins) / 4).toFixed(2)),
                fats: parseFloat((parseFloat($(this).data("values").calsFats) / 9).toFixed(2)),
                calories: calculateCalories
            };
    
            $("#graphOldValuesDisplayer > div").slideUp(250, function () {
                $("#graphOldValuesDisplayer > div > p").hide();
    
                $("#graphOldValuesDisplayer > div > div.row > div:nth-of-type(1) > p > span").html(Math.round(calories.calories()));
                $("#graphOldValuesDisplayer > div > div.row > div:nth-of-type(2) > p:last-of-type").html(calories.fats + "g");
                $("#graphOldValuesDisplayer > div > div.row > div:nth-of-type(3) > p:last-of-type").html(calories.carbs + "g");
                $("#graphOldValuesDisplayer > div > div.row > div:nth-of-type(4) > p:last-of-type").html(calories.proteins + "g");
    
                $("#graphOldValuesDisplayer > div > div.row").show();
                $("#graphOldValuesDisplayer > div").slideDown(250);
            });
        }
    });

}