const currencyFormatter = (num: number) => {
    const formatter = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : 'Ksh',
        minimumFractionDigits : 2
    })

    return formatter.format(num)

}

export default currencyFormatter