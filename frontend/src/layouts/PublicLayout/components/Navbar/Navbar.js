import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../store/actions';
import classnames from 'classnames';
import { withStyles, Typography, List, ListItem } from '@material-ui/core';

// Component styles
import styles from './styles';
import UserPopover from './components/UserPopover/UserPopover';

class Navbar extends Component {
  state = { showMenu: false, scrollPos: window.pageYOffset };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      scrollPos: window.pageYOffset
    });
  };

  render() {
    const { showMenu, scrollPos } = this.state;
    const { classes, isAuth, user, logout } = this.props;
    return (
      <Fragment>
        <nav
          className={classnames({
            [classes.navbar]: true,
            [classes.navbarColor]: scrollPos > 30
          })}>
          <Link className={classes.logoLink} to="/">
            <Typography className={classes.logo} variant="h2">
              Takflix Offline
            </Typography>
          </Link>
          <div className={classes.navLinks}>
            <Link className={classes.navLink} to="/">
              Головна сторінка
            </Link>
            <Link className={classes.navLink} to="/movie/category/afisha">
              Афіша
            </Link>
            <Link className={classes.navLink} to="/movie/category/comingSoon">
              Про нас
            </Link>
            <Link className={classes.navLink} to="/cinemas">
              Зали
            </Link>
          </div>

          <div className={classes.navAccount}>
            <UserPopover logout={logout}>
              <List component="nav">
                {user && (
                  <ListItem>
                    <Link
                      className={classes.navLink}
                      to={
                        user.role !== 'user'
                          ? '/admin/dashboard'
                          : '/mydashboard'
                      }>
                      Профіль
                    </Link>
                  </ListItem>
                )}

                {isAuth ? (
                  <ListItem>
                    <Link className={classes.navLink} onClick={logout} to="/">
                      Вийти
                    </Link>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Link className={classes.navLink} to="/login">
                      Увійти
                    </Link>
                  </ListItem>
                )}
              </List>
            </UserPopover>
          </div>

          <div className={classes.navMobile}>
            <div
              className={classes.navIcon}
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
              <div
                className={classnames(
                  classes.navIconLine,
                  classes.navIconLine__left
                )}
              />
              <div className={classes.navIconLine} />
              <div
                className={classnames(
                  classes.navIconLine,
                  classes.navIconLine__right
                )}
              />
            </div>
          </div>
        </nav>
        <div
          className={classnames({
            [classes.navActive]: showMenu,
            [classes.nav]: true
          })}>
          <div className={classes.navContent}>
            <div className={classes.currentPageShadow}>Movies</div>
            <ul
              className={classes.innerNav}
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
              <li className={classes.innerNavListItem}>
                <Link className={classes.innerNavLink} to="/">
                  Головна сторінка
                </Link>
              </li>
              <li className={classes.innerNavListItem}>
                <Link
                  className={classes.innerNavLink}
                  to="/movie/category/afisha">
                  Афіша
                </Link>
              </li>
              <li className={classes.innerNavListItem}>
                <Link
                  className={classes.innerNavLink}
                  to="/movie/category/comingSoon">
                  Про нас
                </Link>
              </li>
              <li className={classes.innerNavListItem}>
                <Link className={classes.innerNavLink} to="/cinemas">
                  Зали
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.authState.isAuthenticated,
  user: state.authState.user
});

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Navbar));
