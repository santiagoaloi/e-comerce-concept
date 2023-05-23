<template>
  <VContainer>
    <QuantitySelector />
  </VContainer>
</template>

<script setup>
async function submitCard() {
  const photoOfCard = document.querySelector('#photoOfCard')
  const playerName = document.querySelector('#playerName')
  const team = document.querySelector('#team')
  const year = document.querySelector('#year')
  const brand = document.querySelector('#brand')
  const refractor = document.querySelector('#refractor')
  const rookie = document.querySelector('#rookie')
  const auto = document.querySelector('#auto')
  const relic = document.querySelector('#relic')

  try {
    const docRef = await addDoc(collection(db, 'db0fCards'), {
      photoOfCard: photoOfCard.value,
      playerName: playerName.value,

      team: team.value,
      year: year.value,
      brand: brand.value,
      refractor: refractor.value4,
      rookie: rookie.value,
      auto: auto.value,
      reli: relic.value
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}
</script>

<style lang="scss" scoped></style>
