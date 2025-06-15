
import React from 'react';

export default function ReviewsManager() {
  // Nessun review demo, visualizza solo stato vuoto
  return (
    <div className="w-full my-10 flex flex-col items-center">
      <p className="text-orange-500 text-center">
        Nessuna recensione disponibile. Le recensioni reali compariranno qui quando saranno disponibili.
      </p>
    </div>
  );
}
