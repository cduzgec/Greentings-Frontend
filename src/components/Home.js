import React from 'react';
import Text from './text';
import MainPageItems from './MainPageItems';
import Slide from './sliderForMainPage';
function Home() {


  return (
    <div>
      <div >
      <Slide />

        <MainPageItems />
        <Text />
      </div>

    </div>
  )
}

export default Home;
