import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <span className="ms-1">2022 everyparking</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
