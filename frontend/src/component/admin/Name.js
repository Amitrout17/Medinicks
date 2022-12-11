import React from 'react'

function Name({data}) {
  return (
    <div>{data.slice(0, 20)}..</div>
  )
}

export default Name