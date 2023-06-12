# Frontend Mentor - Age calculator app solution

This is a solution to
the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q)
. Frontend Mentor challenges help you improve your coding skills by building realistic projects.

### Screenshot

![](./screenshot.png)

### Links

- [Live Site URL:](https://bytepack-frontendmentor-age-calculator.dev/)

### Built with

- HTML5
- CSS3
- JS

### How it's done

If the birthday is behind today:

```js
birthDate.getDate() <= now.getDate()
```

I get all the months between two dates this way:

```js
const monthsBetween = now.getMonth() - birthDate.getMonth() +
    (12 * (now.getFullYear() - birthDate.getFullYear()))
```

Now I can calculate years and months like this:
(A year is 12 months)

```js
const years = Math.floor(monthsBetween / 12)
const months = monthsBetween % 12
```

The birthday was behind today, so we need to calculate those days:

```js
const days = now.getDate() - birthDate.getDate()
```

But If the birthday is ahead of today:

```js
birthDate.getDate() > now.getDate()
```

I use the same formula as before to calculate all the months between two dates, except this time the birth month must
not be included in the months, because it's not a complete month, so I decrement monthsBetween and the months and years
are calculated the same as before:

```js
monthsBetween = monthsBetween - 1
```

I didn't include the birth month in the months, because it's not a complete month based on the today date (some days are
passed based on today day birthDate.getDate() > now.getDate()), so to think about it easily, I put the passed days of
current month in the birth month. Now I need to calculate how many days is left in the birth month
(Only the days between two days are passed, because in my head I added all the passed days of current month to the
birth month)

I have to calculate the two days differences

```js
const daysDiff = birthDate.getDate() - now.getDate()
```

And subtract this difference from the last day of birth month

````js
const lastDayOfBirthMonth = new Date(birthDate.getFullYear(), birthDate.getMonth() + 1, 0).getDate()
days = lastDayOfBirthMonth - daysDiff
````