import MyFavouritesLesson from '@/components/dashboard/MyFavourites';
import React from 'react';

const MyFavoritesPage = () => {
    return (
        <div>
            <h3 className='text-2xl font-bold mb-2 text-slate-700'>My Favorite Lessons</h3>
            <MyFavouritesLesson />
        </div>
    );
};

export default MyFavoritesPage;
