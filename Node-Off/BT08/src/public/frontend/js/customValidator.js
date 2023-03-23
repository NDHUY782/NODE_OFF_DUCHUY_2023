// Đối tượng Validator 
function Validator(options) {

    var selectorRules = {};

    // Hàm thực hiện chức năng validate
    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement   = inputElement.parentElement.querySelector(options.errorSelector);

        var rules = selectorRules[rule.selector];
        for (let i = 0; i < rules.length; ++i ) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) break;
        }

        if (errorMessage){
             errorElement.innerText = errorMessage;
        }
        else {
             errorElement.innerText = '';
        }

        return !errorMessage;
    }

    // Lấy Element của form cần thực hiện 
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Khi submit form
        formElement.onsubmit = (e) => {
            e.preventDefault();

            var isFormValid = true;

            //Lặp qua từng rules và validate
            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid){
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                formElement.submit();
            }
        }

        // Lặp qua mỗi rule và xử lý sự kiện (Blur, input,...)
        options.rules.forEach((rule) => {
            // lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = () => {
                    validate(inputElement, rule);
                }

                // xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = () => {
                    var errorElement   = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                }
            }
        })
    }
}



// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi không có lỗi => không trả ra gì cả (undefined)
Validator.isRequired = (selector, message) => {
    return {
        selector: selector,
        test:(value) => {
            return value.trim() ? undefined :  message || 'Vui lòng nhập trường này';
        }
    }
}

Validator.minMaxInt = (selector, min, max, message) => {
    return {
        selector: selector,
        test:(value) => {
            return (min <= value && value <= max) ? undefined : message || `Vui lòng nhập giá trị ${min} đến ${max}`;
        }
    }
}

Validator.minLength = (selector, min, message) => {
    return {
        selector: selector,
        test:(value) => {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}

Validator.isSelected = (selector, message) => {
    return {
        selector: selector,
        test:(value) => {
            return value !== 'novalue' ? undefined : message || `Vui lòng chọn trường này`;
        }
    }
}

