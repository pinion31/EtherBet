import React from 'react';
import LoginBar from './functional/LoginBar.jsx';
import styles from './css/Landing.css';

class Landing extends React.Component {
  state = {

  }

  render() {
    return (
      <LoginBar history={this.props.history}>
        <main>
          <div>
            <div className={styles['left-side-menu']}>
              <h2 className={styles['menu-heading']}>{'Today\'s Games'}</h2>
              <div className={styles['game-box']}>
                <div className={styles['side-menu-text']}>
                  <p>Dallas Cowboys</p>
                  <p>-5(-110)</p>
                </div>
                <p className={styles['side-menu-text']}>vs.</p>
                <div className={styles['side-menu-text']}>
                  <p>New York Giants</p>
                  <p>-5(-110)</p>
                </div>
              </div>
            </div>
            <div className={styles['feature-column']}>
              <div className={styles['feature-images']}>
                <img alt="sport" src="http://placekitten.com/g/150/400" />
                <img alt="sport" src="http://placekitten.com/g/150/400" />
                <img alt="sport" src="http://placekitten.com/g/150/400" />
              </div>
              <div className={styles.featured}>
                <div className={styles['featured-menu-bar']}>
                  <h2> Featured Games</h2>
                </div>
                <div className={styles['sport-bar']}>
                  <h3> NFL Football </h3>
                </div>
                <div className={styles['game-row']}>
                  <div>
                    <p>SUN NOV 22</p>
                    <p>2:30 ET</p>
                  </div>
                  <div>
                    <div>
                      <p>Dallas Cowboys</p>
                      <p>at</p>
                      <p>New England Patriots</p>
                    </div>
                    <button type="submit">Bet Now</button>
                  </div>
                  <div>
                    <p>-110</p>
                    <p>+110</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles['right-side-menu']}>
              <h2 className={styles['menu-heading']}>Sports News</h2>
              <article className={styles.article}>
                <h4>Bears vs Ram Week 11 Odds</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation. Duis aute irure dolor in reprehenderit... </p>
                <button type="submit">Read More</button>
              </article>
              <article className={styles.article}>
                <h4>Myles Garrett Suspended Indefinitely</h4>
                <p>Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Leo in vitae turpis massa sed elementum tempus egestas. Sit amet nisl purus in mollis. Aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Consectetur adipiscing elit ut aliquam purus sit. Morbi quis commodo odio aenean sed. Id donec ultrices tincidunt arcu non sodales neque sodales ut. Rutrum quisque non tellus orci ac auctor augue mauris. Ultrices vitae auctor eu augue. Aliquam sem et tortor consequat id porta nibh venenatis cras. Cursus eget nunc scelerisque viverra. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. In ante metus dictum at tempor commodo. Mi proin sed libero enim sed faucibus turpis in. </p>
                <button type="submit">Read More</button>
              </article>
            </div>
          </div>
        </main>
      </LoginBar>
    );
  }
}

export default Landing;
