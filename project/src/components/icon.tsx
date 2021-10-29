import {useEffect, useState} from 'react';

type iconTypes = {
  name: string,
}

function Icon({name}: iconTypes) {
  const [iconModule, setIconModule] = useState(null);
  useEffect(() => {
    import(`./../../public/img/${name}.svg`).then((module) => {
      setIconModule(module);
    })
      .catch((error) => {
        // console.error(`Icon with name: ${name} not found!`);
      });
  }, [name]);
  // const renderIcon = () => {
  //   if (!iconModule) {
  //     return null;
  //   }
  //   const Component = iconModule.ReactComponent;
  //   return <Component/>;
  // };
  console.log(iconModule);
  return <>{'XXX'}</>;
  // return <>{renderIcon()}</>;
}

export default Icon;
