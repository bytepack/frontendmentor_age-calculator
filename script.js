const theForm = document.querySelector(".cal__form")

const fieldDay = document.querySelector("[data-field-day]")
const fieldMonth = document.querySelector("[data-field-month]")
const fieldYear = document.querySelector("[data-field-year]")

const inputDay = fieldDay.querySelector(".cal__input")
const inputMonth = fieldMonth.querySelector(".cal__input")
const inputYear = fieldYear.querySelector(".cal__input")

const fieldErrorDay = fieldDay.querySelector(".cal__error")
const fieldErrorMonth = fieldMonth.querySelector(".cal__error")
const fieldErrorYear = fieldYear.querySelector(".cal__error")

const outputDay = document.querySelector(".cal__result--d")
const outputMonth = document.querySelector(".cal__result--m")
const outputYear = document.querySelector(".cal__result--y")


theForm.addEventListener("submit", e => {
    e.preventDefault()
    const now = new Date()
    if (validate(now)) {
        const birthDate = new Date(null, parseInt(inputMonth.value) - 1, inputDay.value)
        birthDate.setFullYear(parseInt(inputYear.value))
        const result = calculateAge(now, birthDate)
        showResult(result)
    }
})

function calculateAge(now, birthDate) {
    const daysDiff = now.getDate() - birthDate.getDate()
    let monthsBetween = now.getMonth() - birthDate.getMonth() +
        (12 * (now.getFullYear() - birthDate.getFullYear()))
    let days = daysDiff
    if (daysDiff < 0) {
        monthsBetween = monthsBetween - 1
        const lastDayOfBirthMonth = new Date(birthDate.getFullYear(), birthDate.getMonth() + 1, 0).getDate()
        days = lastDayOfBirthMonth + daysDiff
    }
    const years = Math.floor(monthsBetween / 12)
    const months = monthsBetween % 12

    return {days, months, years}
}

function validate(now) {
    const [yearResult, monthResult, dayResult] = [validateYear(now), validateMonth(now), validateDay(now)]
    return yearResult && monthResult && dayResult
}

function validateYear(now) {
    if (!basicValidate(fieldYear, inputYear, fieldErrorYear)) {
        return false
    }
    if (parseInt(inputYear.value) < 1) {
        showError(fieldYear, fieldErrorYear, "Must be a valid year")
        return false
    }
    if (parseInt(inputYear.value) > now.getFullYear()) {
        showError(fieldYear, fieldErrorYear, "Must be in the past")
        return false
    }
    hideError(fieldYear)
    return true
}

function validateMonth(now) {
    if (!basicValidate(fieldMonth, inputMonth, fieldErrorMonth)) {
        return false
    }
    if (parseInt(inputMonth.value) > 12 || parseInt(inputMonth.value) < 1) {
        showError(fieldMonth, fieldErrorMonth, "Must be a valid month")
        return false
    }
    if (parseInt(inputYear.value) === now.getFullYear() && parseInt(inputMonth.value) > now.getMonth() + 1) {
        showError(fieldMonth, fieldErrorMonth, "Must be in the past")
        return false
    }
    hideError(fieldMonth)
    return true

}

function validateDay(now) {
    if (!basicValidate(fieldDay, inputDay, fieldErrorDay)) {
        return false
    }
    let lastDayOfMonth = new Date(inputYear.value, inputMonth.value, 0).getDate();
    if (parseInt(inputDay.value) > lastDayOfMonth || parseInt(inputDay.value) < 1) {
        showError(fieldDay, fieldErrorDay, "Must be a valid day")
        return false
    }
    if (parseInt(inputYear.value) === now.getFullYear() &&
        parseInt(inputMonth.value) === now.getMonth() + 1 &&
        parseInt(inputDay.value) > now.getDate()) {
        showError(fieldDay, fieldErrorDay, "Must be in the past")
        return false
    }
    hideError(fieldDay)
    return true
}

function basicValidate(field, fieldInput, fieldError) {
    if (fieldInput.value.trim() === "") {
        showError(field, fieldError, "This field is required")
        return false
    }
    if (isNaN(fieldInput.value)) {
        showError(field, fieldError, "Must be a valid number")
        return false
    }

    hideError(field)
    return true
}

function showError(filed, fieldError, message) {
    fieldError.textContent = message
    filed.classList.add("cal__field--error")
}

function hideError(field) {
    field.classList.remove("cal__field--error")
}

let idy, idm, idd

function showResult({days, months, years}) {
    outputDay.textContent = "0"
    outputMonth.textContent = "0"
    outputYear.textContent = "0"
    clearInterval(idy)
    clearInterval(idm)
    clearInterval(idd)
    let timeout = 23
    years > 100 && (timeout = 1)
    idy = setInterval(() => {
        if (parseInt(outputYear.textContent) === years) {
            clearInterval(idy)
            return
        }
        outputYear.textContent = (parseInt(outputYear.textContent) + 1).toString()
    }, timeout)

    idm = setInterval(() => {
        if (parseInt(outputMonth.textContent) === months) {
            clearInterval(idm)
            return
        }
        outputMonth.textContent = (parseInt(outputMonth.textContent) + 1).toString()
    }, 23)
    idd = setInterval(() => {
        if (parseInt(outputDay.textContent) === days) {
            clearInterval(idd)
            return
        }
        outputDay.textContent = (parseInt(outputDay.textContent) + 1).toString()
    }, 23)

}
