'use client'
import NewsPage from '@/components/layout/newsPage/newsPage';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function Search (){
    const router = useSearchParams();
    const idNews = router.get('idNews') as string
    return (
        <NewsPage idNews={idNews} origem='view'/>
    )
}
export default function Page() {     

    return(
        <Suspense>
            <Search />
        </Suspense>
    )
}