use axum::{
    http::{HeaderMap, StatusCode},
    response::IntoResponse,
    routing::get,
    Router,
};

use std::net::SocketAddr;

#[tokio::main]
async fn main() {
    let port = 8080;
    let addr = SocketAddr::from(([127, 0, 0, 1], port));

    let app = Router::new().route("/", get(root));

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> impl IntoResponse {
    let mut headers = HeaderMap::new();
    headers.insert("Content-Type", "text/html".parse().unwrap());

    (StatusCode::OK, headers, "<h1>Hello World!</h1>")
}
