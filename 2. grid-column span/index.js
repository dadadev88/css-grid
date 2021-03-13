const rules = {
	email: { minLength: 5, maxLength: 20, email: true },
	name: { minLength: 10, maxLength: 20 },
	phone: { minLength: 3, maxLength: 15, onlyNumber: true }
}

const validations = {
	minLength: (input) => input.value.length < rules[input.id].minLength,
	maxLength: (input) => input.value.length > rules[input.id].maxLength,
	onlyNumber: (input) => !/[0-9]+/.test(Number(input.value)),
	email: (input) => !/^[\w-\.]+@([a-z0-9-_]+\.)+[a-z]{2,4}$/.test(input.value),
}

const validationMessages = {
	minLength: (input) => `Debe tener ${rules[input].minLength} caracteres mínimo.`,
	maxLength: (input) => `Debe tener ${rules[input].maxLength} caracteres mínimo.`,
	onlyNumber: () => `Debe tener solo números`,
	email: () => `Correo electrónico inválido.`
}

/**
 * Mostrar etiqueta de error
 * @param {HTMLElement} input elemento validado
 * @param {String} rule regla a aplicar
 */
const showErrorLabel = (input, rule) => {
	const message = validationMessages[rule](input.getAttribute("id")),
		divParent = input.parentNode,
		labelError = divParent.querySelector("label.form-input__label-error");
	
	divParent.classList.add("input-error");
	if (!labelError) {
		const label = document.createElement("label");
		label.className = "form-input__label-error animate__animated animate__flipInY";
		label.setAttribute("for", input.id);
		label.innerText = message;
		divParent.appendChild(label);
	} else {
		labelError.innerText = message;
	}
}

const handlerErrorEvent = (input, eventName) => {
	document.getElementById(input).addEventListener(eventName, (event) => {
		const rulesListByInput = Object.keys(rules[input]),
			elementInput = event.target;
		for (let rule of rulesListByInput) {
			const divParent = elementInput.parentNode;
			if (rules[elementInput.id][rule] && validations[rule](elementInput)) {
				showErrorLabel(elementInput, rule);
				break;
			} else {
				divParent.classList.remove("input-error");
			}
		}
	});
}

Object.keys(rules).forEach(inputName => {
	handlerErrorEvent(inputName, "blur");
	handlerErrorEvent(inputName, "keyup");
})
