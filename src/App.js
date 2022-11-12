import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import SuperHeroesPage from './components/SuperHeroes.page';
import RQSuperHeroesPage from './components/RQSuperHeroes.page';
import HomePage from './components/Home.page';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import RQSuperHero from './components/RQSuperHero';
import DynamicParallelPage from './components/DynamicParallelPage';
import DependentQueriesPage from './components/DependentQueriesPage';
import QueryPagination from './components/QueryPagination';
import InfiniteQueryPage from './components/InfiniteQueryPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch>
          <Route path='/rq-infinite-query'>
            <InfiniteQueryPage />
          </Route>
          <Route path='/rq-pagination-query'>
            <QueryPagination />
          </Route>
          <Route path='/rq-dependent-queries'>
            <DependentQueriesPage email={'ht0201@gmail.com'} />
          </Route>
          <Route path='/rq-dynamic-parallel'>
            <DynamicParallelPage heroIds={[1, 3]} />
          </Route>
          <Route path='/rq-super-heroes/:heroId'>
            <RQSuperHero />
          </Route>
          <Route path='/super-heroes'>
            <SuperHeroesPage />
          </Route>
          <Route path='/rq-super-heroes'>
            <RQSuperHeroesPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} position='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
