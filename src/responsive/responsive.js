const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const devices = {
  mobileS: `(min-width: ${sizes.mobileS}) and (max-width: ${sizes.mobileM})`,
  mobileM: `(max-width: ${sizes.mobileL})`,
  mobileL: `(max-width: ${sizes.tablet})`,
  tablet: `(min-width: ${sizes.tablet}) and (max-width: ${sizes.laptop})`,
  laptop: `(min-width: ${sizes.laptop}) and (max-width: ${sizes.laptopL})`,
  laptopL: `(min-width: ${sizes.laptopL}) and (max-width: ${sizes.desktop})`,
  desktop: `(min-width: ${sizes.desktop})`,
};
