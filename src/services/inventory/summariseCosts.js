export default function summariseCosts (costsData) {
  return costsData.reduce((inventory, costs)=> {
    const totalCars     = costs.length
    const totalValue    = costs.reduce((sum, cost)=> sum + cost.value, 0)
    const totalDiscount = costs.reduce((sum, cost)=> sum + cost.discountCents, 0)

    return {
      totalAmountOfCars:  inventory.totalAmountOfCars + totalCars,
      value:              inventory.value + totalValue,
      discountInCents:    inventory.discountInCents + totalDiscount
    }
  }, {
    totalAmountOfCars:  0,
    value:              0,
    discountInCents:    0
  })
}
