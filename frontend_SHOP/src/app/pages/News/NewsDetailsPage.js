import React, { useEffect } from "react";
import Gap from "../../components/Commom/Gap";
import FashionNewsSub from "../../modules/FashionNews/FashionNewsSub";
import Image from "../../components/Image/Image";
import CategoryNews from "../../modules/FashionNews/parts/CategoryNews";
import DateCreateNews from "../../modules/FashionNews/parts/DateCreateNews";
import { Divider } from "antd";
import Title from "../../components/Commom/Title";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Input/TextArea";
import Button from "../../components/Button/Button";
import UserCommentItem from "../../modules/User/UserCommentItem";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddCommentNews,
  handleGetAllNews,
  handleGetCommentNews,
  handleGetDetailsNews,
} from "../../../store/news/handleNews";
import parse from "html-react-parser";
import { Epath } from "../../routes/routerConfig";
import { LIMIT_HIGH } from "../../../utils/commom";
const NewsDetailsPage = () => {
  const { control, handleSubmit, setValue } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetDetailsNews(id));
    dispatch(handleGetCommentNews({ id: id, limit: LIMIT_HIGH }));
  }, [dispatch, id]);
  useEffect(() => {
    dispatch(handleGetAllNews());
  }, [dispatch]);

  const dataDetailNews = useSelector((state) => state.news.dataDetailNews);
  const { loading } = useSelector((state) => state.news);
  const dataAllNews = useSelector((state) => state.news.dataAllNews);
  const dataAllCommentNews = useSelector(
    (state) => state.news.dataAllCommentNews
  );

  const { dataCurrentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setValue("userName", dataCurrentUser?.userName);
    setValue("email", dataCurrentUser?.email);
  }, [dataCurrentUser?.email, dataCurrentUser?.userName, setValue]);

  const handleAddCommentNewsForm = (data) => {
    const mergeData = {
      content: data.content,
      userId: dataCurrentUser?.id,
      newsId: parseInt(id),
      callback: () => {
        setValue("content", "");
      },
    };
    dispatch(handleAddCommentNews(mergeData));
  };
  return (
    <div>
      <Gap>
        <div className="grid grid-cols-7 gap-x-6">
          <div className="col-span-5">
            <div className="pr-10">
              <div className="flex flex-col gap-y-4">
                <Image
                  url={dataDetailNews?.url}
                  className="min-w-[750px] h-[500px] rounded-lg overflow-hidden object-cover"
                ></Image>

                <div>
                  <Title
                    title={dataDetailNews?.title}
                    className="text-[26px] font-semibold"
                  ></Title>
                </div>
                <div className="flex items-center gap-x-6 my-2">
                  <DateCreateNews
                    date={dataDetailNews?.createdAt}
                  ></DateCreateNews>
                  <CategoryNews
                    className="max-w-[330px] "
                    name={dataDetailNews?.category?.name}
                  ></CategoryNews>
                </div>
                <Divider
                  style={{
                    backgroundColor: "#F3F4F6",
                    padding: "0",
                    margin: "0",
                  }}
                ></Divider>

                <div className="entry-content">
                  {parse(dataDetailNews?.content || "")}
                </div>
                {dataCurrentUser ? (
                  <form
                    onSubmit={handleSubmit(handleAddCommentNewsForm)}
                    className="flex flex-col gap-y-4 mt-[60px]"
                  >
                    <Title
                      title="Viết bình luận của bạn"
                      className="my-4 text-[20px] font-semibold"
                    ></Title>

                    <div className="comment">
                      <div className="flex items-center gap-x-3">
                        <Input
                          control={control}
                          name="userName"
                          placeholder="Nhập Tên của bạn...."
                          className="min-w-[360px] opacity-70"
                          readOnly
                        ></Input>
                        <Input
                          control={control}
                          name="email"
                          placeholder="Nhập Email của bạn...."
                          className="min-w-[360px] opacity-70"
                          readOnly
                        ></Input>
                      </div>
                      <TextArea
                        control={control}
                        name="content"
                        placeholder="Bình luận của bạn...."
                        className="mt-5"
                      ></TextArea>
                    </div>

                    <Button
                      kind="primary"
                      type="submit"
                      className="py-3 px-4 w-[200px] rounded-md"
                      isLoading={loading}
                    >
                      Gửi Bình Luận
                    </Button>
                  </form>
                ) : (
                  <Link
                    to={Epath.loginPage}
                    style={{ fontWeight: 600, marginTop: "20px" }}
                  >
                    <span className="text-primary hover:opacity-80">
                      Đăng Nhập
                    </span>{" "}
                    để chia sẻ ý kiến nhé !
                  </Link>
                )}

                <div className="mt-10">
                  <Title
                    title={`Bình Luận (${dataAllCommentNews?.totalResults})`}
                    className="text-[20px] font-semibold"
                  ></Title>

                  <div className="flex flex-col gap-y-6 mt-10">
                    {dataAllCommentNews?.results?.length > 0 ? (
                      dataAllCommentNews?.results?.map((cmt) => (
                        <UserCommentItem
                          key={cmt.id}
                          data={cmt}
                        ></UserCommentItem>
                      ))
                    ) : (
                      <p>Hãy Để lại bình luận về bài viết nhé !</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <FashionNewsSub dataNews={dataAllNews?.results}></FashionNewsSub>
          </div>
        </div>
      </Gap>
    </div>
  );
};

export default NewsDetailsPage;
