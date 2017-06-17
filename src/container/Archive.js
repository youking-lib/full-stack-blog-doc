import React from 'react'
import { connect } from 'dva'
import ArchiveComponent from 'components/Archive'

const Archive = (props) => {
    return (
        <ArchiveComponent {...props} />
    )
}

const mapStateToProps = ({archive, loading}) => {
    const { archives } = archive
    return {
        archives, loading: loading.effects['archive/lazyloadTimeline']
    }
}

export default connect(mapStateToProps)(Archive)