import BaseMacros from '../../../macros/base-macros';
const toggleCaloricDistributionScreen = showGraphDetails => {
    if(showGraphDetails){
        $(".caloricDistribution__mainContainer").removeClass("active");
        $(".caloricDistribution__detailsContainer").addClass("active");
    }else{
        $(".caloricDistribution__mainContainer").addClass("active");
        $(".caloricDistribution__detailsContainer").removeClass("active");
    }
}
export default () => {
    $(document).on("click", ".graphContainer__content li", function(){
        toggleCaloricDistributionScreen(true);
    });

    $(document).on("click", ".caloricDistribution__detailsContainer__header .menu-back", () => toggleCaloricDistributionScreen(false));
}