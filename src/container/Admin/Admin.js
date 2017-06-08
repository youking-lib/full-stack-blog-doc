import React from 'react'
import { connect } from 'dva'

import AdminLayout from 'components/Admin/AdminLayout'

const Admin = ({children}) => {
    return (
        <AdminLayout>{children}</AdminLayout>
    )
}

export default connect()(AdminLayout)