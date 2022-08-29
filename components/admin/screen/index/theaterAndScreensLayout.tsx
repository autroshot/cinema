import { useState } from 'react';
import Screens from './screens';
import Theater from './theater';

export default function TheaterAndScreensLayout({
  theaterIncludingScreens,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Theater
        id={theaterIncludingScreens.id}
        name={theaterIncludingScreens.name}
        open={open}
        onClick={() => setOpen(!open)}
      />
      <Screens
        theaterId={theaterIncludingScreens.id}
        screens={theaterIncludingScreens.screens}
        open={open}
      />
    </>
  );
}

interface Props {
  theaterIncludingScreens: {
    screens: {
      no: number;
    }[];
    id: number;
    name: string;
  };
}
