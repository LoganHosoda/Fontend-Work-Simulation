import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, {useState} from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {  
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBlogData, updateBlogData] = useState(
    blogs.posts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  );
  const totalCount = blogs.posts.length;
  const totalPages = Math.ceil(totalCount / pageSize);

  const updateRowsPerPage = (size) => {
    setPageSize(size),
    setCurrentPage(1),
    updateBlogData(blogs.posts.slice((1 - 1) * size, 1 * size))
  };

  const updatePage = (newPage) => {
    setCurrentPage(newPage),
    updateBlogData(blogs.posts.slice((newPage - 1) * pageSize, newPage * pageSize))
  };
  
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentBlogData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}


export default BlogList;
