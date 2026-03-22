// eslint-disable-next-line no-unused-vars
import React from 'react'

export function TransactionDetails({ title, subtitles}) {
  return (
    <>
      <h3>{title}</h3>
      {subtitles.map(subtitle => <><sub>{subtitle}</sub><br /></>)}
    </>
  )
}