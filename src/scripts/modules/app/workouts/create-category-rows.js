import global from '../../global-variables';

export default (checkSpecificCategory = false, categoryIdToCheck = 0, enableEditing = true) => {
    var categoryRows = "";
    if (Object.keys(global.exerciseCategories).length > 0) {
        var isFirstRow = true;
        for (let exerciseCategory of global.exerciseCategories) {
            categoryRows += `<tr class='optionCategory' data-category='` + JSON.stringify(exerciseCategory) + `' data-editing-enabled='` + JSON.stringify(enableEditing) + `'>
                        <td>
                            <div class='position-relative'>
                                <input value='` + exerciseCategory.relativeKey + `' type="radio" name="category" ` + (checkSpecificCategory ? (exerciseCategory.relativeKey == categoryIdToCheck ? "checked" : "") : (isFirstRow ? "checked" : "")) + `>
                                <h3>` + exerciseCategory.obj.title + `</h3>
                            </div>
                            <p>`+ exerciseCategory.obj.description + `</p>
                        </td>
                    </tr>`;
            isFirstRow = false;
        }
    } else {
        categoryRows += `<tr>
                <td class='optionCategory'><h3>No categories created yet.</h3></td>
                    </tr>`;
    }
    return categoryRows;
}