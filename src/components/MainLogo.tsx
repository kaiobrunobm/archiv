import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function MainLogo(props:any) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={22} cy={22} r={22} fill="#FF7043" />
    </Svg>
  )
}

export default MainLogo
