import {ComponentType} from 'react';
import HeaderLayout from '../components/header-layout';

export function withHeader<T>(Component: ComponentType<T>): ComponentType<T> {

  function WithLayout(props: T): JSX.Element {
    return (
      <HeaderLayout>
        <Component {...props as T}/>
      </HeaderLayout>
    );
  }

  return WithLayout;
}

