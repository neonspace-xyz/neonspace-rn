/* fonts */
export const FontFamily = {
  clashGrotesk: "Clash Grotesk",
  cgBold: "ClashGrotesk-Bold",
  cgExtraLight: "ClashGrotesk-ExtraLight",
  cgLight: "ClashGrotesk-Light",
  cgMedium: "ClashGrotesk-Medium",
  cgRegular: "ClashGrotesk-Regular",
  cgSemiBold: "ClashGrotesk-Semibold",
  cgVariable: "ClashGrotesk-Variable",
  labelLarge: "Satoshi",
  sFProText: "SF Pro Text",
};

export const getFontFamily = (fontWeight) => {
  switch (fontWeight) {
    case '100':
      return 'ClashGrotesk-Extralight'; // Extralight digunakan untuk font-weight 100
    case '200':
      return 'ClashGrotesk-Extralight'; // Extralight juga bisa digunakan untuk font-weight 200
    case '300':
      return 'ClashGrotesk-Light'; // Light untuk font-weight 300
    case '400':
      return 'ClashGrotesk-Regular'; // Regular untuk font-weight 400
    case '500':
      return 'ClashGrotesk-Medium'; // Medium untuk font-weight 500
    case '600':
      return 'ClashGrotesk-Semibold'; // Semibold untuk font-weight 600
    case '700':
      return 'ClashGrotesk-Bold'; // Bold untuk font-weight 700
    case '800':
      return 'ClashGrotesk-Bold'; // Bold digunakan juga untuk font-weight 800
    case '900':
      return 'ClashGrotesk-Bold'; // Bold digunakan juga untuk font-weight 900
    default:
      return 'ClashGrotesk-Regular'; // Default jika font-weight tidak dikenal
  }
};


/* font sizes */
export const FontSize = {
  size_xs: 12,
  labelLarge_size: 16,
  size_lg: 18,
  size_9xl: 28,
  size_5xl: 24,
  size_5xs: 8,
  size_mid: 17,
  size_sm: 14,
  size_xl: 20,
  size_17xl: 36,
  size_13xl: 32,
};
/* Colors */
export const Color = {
  colorDarkslategray_100: "#3e4155",
  colorDarkslategray_200: "#3f3f3f",
  colorDarkslategray_300: "#2b2d41",
  colorDarkslategray_400: "#2a2d41",
  darkInk: "#fff",
  colorGainsboro_100: "#d9d9d9",
  colorGray_100: "#16171f",
  colorGray_200: "#02030b",
  colorGray_300: "rgba(255, 255, 255, 0.8)",
  colorGray_400: "rgba(255, 255, 255, 0.6)",
  colorGray_500: "rgba(255, 255, 255, 0.3)",
  colorGray_600: "rgba(0, 0, 0, 0.45)",
  colorGray_700: "rgba(255, 255, 255, 0.4)",
  colorDeeppink: "#fc00a7",
  darkPrimary: "#646464",
  colorDimgray_100: "#484b5f",
  colorWhitesmoke_100: "rgba(248, 248, 248, 0.16)",
  colorCornflowerblue_100: "#329dff",
  colorTurquoise: "rgba(101, 237, 227, 0.2)",
  colorAquamarine: "#c1ffda",
  colorSeagreen: "#417656",
  colorGreenyellow: "#b8ff5e",
  colorBlack: "#000",
  colorMediumslateblue: "#624ed1",
};
/* Paddings */
export const Padding = {
  p_xl: 20,
  p_xs: 12,
  p_sm: 14,
  p_13xl: 32,
  p_5xl: 24,
  p_smi: 13,
  p_5xs: 8,
  p_17xl: 36,
  p_7xl: 26,
  p_3xs: 10,
  p_9xs: 4,
  p_3xl: 22,
  p_base: 16,
  p_7xs: 6,
  p_37xl: 56,
  p_21xl: 40,
  p_4xs_8: 9,
  p_7xs_5: 6,
  p_101xl: 120,
};
/* border radiuses */
export const Border = {
  br_9xs: 4,
  br_5xs: 8,
  br_3xs: 10,
  br_xs: 12,
  br_11xs_3: 1,
  br_9xs_5: 4,
  br_8xs: 5,
  br_10xs: 3,
};

export const styleHeaderTitle = {
  fontSize: FontSize.labelLarge_size,
  textAlign: "center",
  fontWeight: "600",
  color: Color.darkInk,
  fontFamily: FontFamily.clashGrotesk,
}
export const styleHeaderBack = {
  height: 24,
  width: 23,
}
export const styleHeaderBackIcon = {
  width: "100%",
  height: "100%",
}
  
export const StyleTextTitle = {
  textAlign: "center",
  fontWeight: "400",
  fontSize: FontSize.size_sm,
  fontFamily: FontFamily.helvetica,
  color: Color.darkInk,
};
  
export const StyleTextTitle2 = {
  textAlign: "center",
  fontWeight: "400",
  fontSize: FontSize.size_xs,
  fontFamily: FontFamily.helvetica,
  color: Color.darkInk,
};
  
export const StyleButtonBack = {
  width: 32,
  height: 30,
};

export const StyleButtonBackIcon = {
  height: "100%",
  width: "100%",
};

export const StyleHeaderView = {
  width: "100%",
  flexDirection: 'row',
  padding: 14,
  backgroundColor: Color.colorGray_100,
}

export const StyleHeaderImg = {
  width: 30,
  height: 30,
  borderRadius: 50
}

export const StyleHeaderTitle = {
  fontSize: FontSize.labelLarge_size,
  flexGrow: 1, color: "white",
  textAlign: "center",
  paddingTop: 3,
  alignItems: "center",
  color: Color.darkInk,
  fontWeight: "600",
  fontFamily: FontFamily.clashGrotesk,
}