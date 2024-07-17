export interface IconInterface {
  icon: 'house' | 'people' | 'person' | 'globe';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'rounded' | 'circle';
  color?: 'primary' | 'secondary' | 'success' | 'danger';
  bg?: 'primary' | 'gray' | 'black' | 'white' | 'none';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  active?: boolean;
}
