import {
    submitButton, resetButton, inputsGroup, resultBlock,
    genders, age, height, weight,
    caloriesNorm, caloriesMinimal, caloriesMaximal, activities
} from "./script.js";
const caloriesFormulaConstants = new Map([
    ['male', 5],
    ['female', -161]
]);

const physicalActivityRatios = new Map([
    ['activity-minimal', 1.2],
    ['activity-low', 1.375],
    ['activity-medium', 1.55],
    ['activity-high', 1.725],
    ['activity-maximal', 1.9]
]);

let activityRatio = physicalActivityRatios.get('activity-minimal');

const handleReset = () => {
    submitButton.disabled = true;
    resetButton.disabled = true;
    genders.checked = true;
    age.value = '';
    height.value = '';
    weight.value = '';
    activities[0].checked = true;
    resultBlock.classList.add('counter__result--hidden');
};

const checkResetButton = () => {
    resetButton.disabled = !(age.value !== '' || height.value !== '' || weight.value !== '');
};

const checkSubmitButton = () => {
    submitButton.disabled = !(age.value !== '' && height.value !== '' && weight.value !== '');
};

const handleSubmit = (evt) => {
    evt.preventDefault();
    calculateCalories();
    resultBlock.classList.remove('counter__result--hidden');
};

const calculateCalories = () => {

    const genderNorm = genders.checked ? caloriesFormulaConstants.get('male') : caloriesFormulaConstants.get('female');
    const savedWeight = Math.round(((10 * weight.value) + (6.25 * height.value) - (5 * age.value) + genderNorm)
        * activityRatio);
    const caloriesMin = Math.round(savedWeight * 1.15);
    const caloriesMax = Math.round(savedWeight * 0.85);

    caloriesNorm.textContent = String(savedWeight);
    caloriesMaximal.textContent = String(caloriesMin);
    caloriesMinimal.textContent = String(caloriesMax);
};

const caloriesCounter = () => {
    inputsGroup.addEventListener('input', checkSubmitButton);
    activities.forEach(activity => {
        if (activity.checked) activityRatio = physicalActivityRatios.get(activity.id);
        activity.addEventListener('change', () => activityRatio = physicalActivityRatios.get(activity.id));
    });

    submitButton.addEventListener('click', handleSubmit);
};
const reset = () => {
    inputsGroup.addEventListener('input', checkResetButton);
    resetButton.addEventListener('click', handleReset);
};

export {reset};
export {caloriesCounter};








