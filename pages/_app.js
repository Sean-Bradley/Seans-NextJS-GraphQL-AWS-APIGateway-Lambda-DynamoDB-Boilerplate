import App, { Container } from 'next/app'
import React from 'react'
import Head from '../components/head'
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default class MyApp extends App {
  // static async getInitialProps ({ Component, ctx }) {
  //   let pageProps = {}
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }
  //   //console.dir(pageProps);
  //   return { pageProps }
  // }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Container>
    )
  }
}
