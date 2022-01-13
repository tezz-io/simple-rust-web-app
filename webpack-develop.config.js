const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer")

module.exports = {
    mode: "development",
    entry: "./src/app.ts",
    output: {
        filename: "[name]-[fullhash].js",
        chunkFilename: "[name]-[fullhash].js",
        assetModuleFilename: 'public/[name]-[fullhash][ext][query]',
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /tailwind.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                ident: "postcss",
                                plugins: [
                                    tailwindcss,
                                    autoprefixer
                                ]
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: [
                                    "src/styles"
                                ]
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: false,
            template: "./src/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/public",
                    to: "public"
                }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[fullhash].css",
            chunkFilename: "[name]-[fullhash].css"
        })
    ],
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module.identifier()
                            .split("/")
                            .reduceRight(item => item)
                            .replace(/.(js)|(css)/, "")
                            .replace(".", "-")
                            .replace(/ /g, "");
                        const allChunksNames = chunks.map((item) => item.name)
                            .join("-")
                            .replace(/ /g, "-");
                        return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    },
                    chunks: "all"
                }
            }
        },
        minimizer: [
            new TerserJSPlugin({ }),
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    experiments: {
        asyncWebAssembly: true
    }
}
