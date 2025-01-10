import { TableOfContents } from 'lucide-react';

const PostContent: React.FC = ({}) => {
  return (
    <div className="bg-white rounded-xl border border-solid border-post-border mt-4 p-4 hover:border hover:border-solid hover:border-primary">
      <div className="content-title flex justify-between items-center font-medium text-xl mb-2">
        <h4>目录</h4>
        <TableOfContents />
      </div>
      <div className="content-body">
        <ul>
          <li>
            <div>
              <a href="">分享背景</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostContent;
