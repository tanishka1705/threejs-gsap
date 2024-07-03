export interface ButtonColor {
  text: string;
  background: string;
}

export interface DataItem {
  id: number;
  heading: string;
  subHeading: string;
  text: string;
  swatchColor: string;
  background: string;
  headingColor: string;
  buttonColor: ButtonColor;
}


export const data: DataItem[] = [
    {
      id: 1,
      heading: 'Sandy Shores',
      subHeading: 'Unwavering Beige Beauty',
      text: 'It is a versatile and neutral color that can be paired with a variety of different outfits and styles.',
      swatchColor: '#E6D3C4',
      background: '#E5E5E5',
      headingColor: '#000',
      buttonColor: { text: '#000', background: '#D7B172' },
    },
    {
      id: 2,
      heading: 'Earthy Khaki',
      subHeading: 'Chestnut with red tint.',
      text: ' The brown color of the bag adds a touch of warmth and earthiness to its appearance, making it suitable for a wide range of occasions and outfits.',
  
      swatchColor: '#4e4641',
      background: '#79716C',
      headingColor: '#ffffff',
      buttonColor: { text: '#ffffff', background: '#774a37' },
    },
    {
      id: 3,
      heading: 'Ocean Explorer',
      subHeading: 'Ocean with coral tint.',
      text: 'The color blue is often associated with calmness, trust, and intelligence, making a blue backpack a great choice for anyone looking for a stylish and versatile bagpack.',
  
      swatchColor: '#4F92B1',
      background: '#C1D6E3',
      headingColor: '#1F333E',
      buttonColor: { text: '#fff', background: '#2f7393' },
    },
  ];