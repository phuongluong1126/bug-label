from RF import RandomForest
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_cors import CORS, cross_origin
import pandas as pd
app = Flask(__name__)
api = Api(app)

video_put_args = reqparse.RequestParser()
video_put_args.add_argument("title", type=str, help="Title of bug report", required=True)
video_put_args.add_argument("content", type=str, help="Content of bug report", required=True)

from pathlib import Path
resource_fields = {
	'title': fields.Integer,
	'content': fields.String,
}

cors = CORS(app)

#@cross_origin()
class GetAll(Resource):
    def get(self):
        df = pd.read_csv(r'D:\projects\bug-label\RandomForest-master\Dataset\final.csv', sep=',', encoding='latin-1') 
        jsonList = [] 
        for index, row in df.iterrows():
            jsonList.append({"id_sentence": row["id_sentence"], 
            "title":row["title"],
            "id_bug":row["id_bug"],
            "id_comment":row["id_comment"],
            "position_sentence":row["position_sentence"],
            "content_sentence":row["content_sentence"],
            "pre_label":row["pre_label"],
            "result_label":row["result_label"]
            })
        response = jsonify(jsonList)
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

class Create(Resource):
    def get(self):
        args = video_put_args.parse_args()
        rfModel = RandomForest.RandomForestModel(r'D:\projects\bug-label\RandomForest-master\Dataset\final.csv')
        rfModel.Fit()
        response = rfModel.WriteBug(args.title, args.content)
        jsonList = [] 
        for index, row in response.iterrows():
            jsonList.append({"id_sentence": row["id_sentence"], 
            "title":row["title"],
            "id_bug":row["id_bug"],
            "id_comment":row["id_comment"],
            "position_sentence":row["position_sentence"],
            "content_sentence":row["content_sentence"],
            "pre_label":row["pre_label"],
            "result_label":row["result_label"]
            })
        response = jsonify(jsonList)
        # response.headers.add('Access-Control-Allow-Origin', '*')
        return response

api.add_resource(GetAll, "/getall")
api.add_resource(Create, "/create")
if __name__ == "__main__":
    app.run(debug=True)
    
