"use client";
//import { ApolloLink, HttpLink } from "@apollo/client";
import { ApolloLink, createHttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";


//import { setContext } from 'apollo-link-context'
//se reemplaza por:
import { setContext } from "@apollo/client/link/context";


function makeClient() {

  const httpLink = createHttpLink({
    uri: "https://lw-cmrgraphql-65cbb7f3e861.herokuapp.com/"
  })

  const authLink = setContext((_, { headers })  => {

    const token = localStorage.getItem('token');
    return{
      headers:{
        ...headers,
        //myHeader: 'Hola.......'
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  

  // const httpLink = new HttpLink({
  //     //uri: "https://rickandmortyapi.com/graphql",
  //     uri: "http://localhost:4000/",
  // });

  return new NextSSRApolloClient({
    //ACTIVAR APOLLO CHROME
    connectToDevTools: true,
    cache: new NextSSRInMemoryCache(),
    

    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            //httpLink,
            authLink.concat(httpLink),
          ])
        //: httpLink,
        :  authLink.concat(httpLink)
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}