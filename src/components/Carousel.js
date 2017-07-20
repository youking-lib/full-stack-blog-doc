import React, { Component } from 'react'

import Style from './Carousel.module.less'
import img1 from '../assets/1.jpg'
import img2 from '../assets/2.jpg'
import img3 from '../assets/3.jpg'

class Carousel extends Component {
    static defaultProps = {
        speed: 500,
        easing: 'linear',
        lazyLoad: false,
        autoPlay: true,
        autoplaySpeed: 2000,
        prefixCls: 'bg-carousel'
    }

    constructor(props) {
        super(props)

        this.state = {
            currentSlide: 0,
            autoPlayTimer: null,
            lazyLoadedList: []
        }
    }

    loadImg(imgs){
        return new Promise((resolve, reject) => {
            var count = 0
            var errCount = 0
            var imgObj ={}

            for (let i=0; i<imgs.length; i++) {
                imgObj[i] = new Image()
                imgObj[i].src = imgs[i]

                imgObj[i].onload = function(){
                    count++
                    imgObj[i].onload = imgObj[i].onerror = null

                    if (count + errCount === imgs.length) {
                        resolve()
                    }
                }

                imgObj[i].onerror = function(){
                    errCount++
                    imgObj[i].onload = imgObj[i].onerror = null

                    if (count + errCount === imgs.length) {
                        resolve()
                    }
                }
            }
        })
    }

    componentDidMount() {
        if (this.props.lazyLoad && (this.state.lazyLoadedList.length === 0)) {
            this.loadImg(this.props.lazyLoadImgs).then(() => {
                let lazyLoadedList = []

                for (var i=0; i<React.Children.count(this.props.children); i++) {
                    lazyLoadedList.push(i)
                }

                this.setState({ lazyLoadedList })
            })
        }

        if (this.props.autoPlay) {
            this.autoPlay()
        }
    }

    componentWillUnmount() {
        clearTimeout(this.state.autoPlayTimer)
    }

    autoPlay(){
        const speed = this.props.autoplaySpeed

        this.state.autoPlayTimer = setTimeout(() => {
            
            this.autoPlay()
            this.play()

        }, speed)
    }

    play(){
        let preSlide = this.state.currentSlide
        const length = React.Children.count(this.props.children)

        this.setState({
            currentSlide: ++preSlide % length
        })
    }

    getChildStyle(options, custom){
        var style = {}

        style.width = '100%'
        style.height = '100%'
        style.opacity = this.state.currentSlide === options.index ? 1 : 0
        style.transition = `opacity ${options.speed}ms ${options.easing}`

        return Object.assign(style, options.sildeStyle, custom)
    }

    renderList(props){

        const slides = []
        const listClass = this.props.prefixCls + '-slide-list'

        React.Children.forEach(props.children, (elem, index) => {
            let child

            if (!this.props.lazyLoad || (this.state.lazyLoadedList.indexOf(index) >= 0)) {
                child = elem
            } else {
                child = (<div></div>)
            }

            const childStyle = this.getChildStyle(Object.assign({}, props, {index}), child.props.style)

            slides.push(React.cloneElement(child, {
                key: 'original-' + index,
                'data-index': index,
                className: listClass,
                style: childStyle
            }));
        })

        return slides
    }

    render(){
        const slides = this.renderList(this.props)

        return (
            <div className={Style.carouselWrapper} style={this.props.wrapperStyle}> 
                <div className={Style.carouselInner} style={this.props.innerStyle}> 
                    { slides }
                </div>
            </div>
        )
    }
}

export default class CarouselComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            width: 0,
            height: 0,
        }
    }

    componentDidMount() {

        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize)
    }

    onWindowResize = () => {
        const rect = this.getRect()
        
        this.setState({
            ...rect
        })
    }

    getRect(){
        const width = document.documentElement.getBoundingClientRect().width || document.documentElement.offsetWidth || 0
        const height = document.documentElement.getBoundingClientRect().height || document.documentElement.offsetHeight || 0

        return {
            width, height
        }
    }

    render(){

        const { height, width } = this.state 
        const wrapperStyle = {
            width, height, position: 'fixed'
        }
        const sildeStyle = {
            position: 'absolute', top: 0
        }

        const carouselProps = {
            wrapperStyle, sildeStyle,
            autoplaySpeed: 5000,
            lazyLoad: true,
            lazyLoadImgs: [img1, img2, img3]
        }

        return (
            <Carousel {...carouselProps}>
                <div><img width="100%" height="100%" src={img1} /></div>
                <div><img width="100%" height="100%" src={img2} /></div>
                <div><img width="100%" height="100%" src={img3} /></div>
            </Carousel>
        )
    }
}
