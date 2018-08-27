import * as React from "react";
import { connect } from "react-redux";
import fetchPosts from "./fetch-posts";
import { List, Pagination, Spin } from "antd";
import { getVisiblePosts, PAGE_CHANGED } from "./store";

class Posts extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleChange = (pageNumber: number) => {
    this.props.changePage(pageNumber);
  };

  render() {
    if (this.props.loading) {
      return <Spin />;
    }

    console.log(this.props.totalPosts);
    return (
      <List>
        {this.props.posts.map((post: any) => {
          const { id, title, body } = post;
          return (
            <List.Item key={id}>
              <List.Item.Meta title={title} description={body} />
            </List.Item>
          );
        })}
        <Pagination
          total={this.props.totalPosts}
          onChange={this.handleChange}
        />
      </List>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    changePage: page => dispatch({ type: PAGE_CHANGED, payload: page })
  };
};

const mapStateToProps = state => {
  const { totalPosts, loading } = state;
  return {
    loading,
    totalPosts,
    posts: getVisiblePosts(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
