
import "./loader.css"


const Loader = ({bgcol}) => {
    const background={background:bgcol}
    return (
      
        <>
          <div className="loaderwrapper" style={background}>
            {
                console.log(background)
            }
          <div class="loading">
                <div className="circle cyan"></div>
                <div className="circle magenta"></div>
                <div className="circle yellow"></div>
            </div>
          </div>
        </>
    )
}

export default Loader