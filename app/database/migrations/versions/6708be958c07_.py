"""empty message

Revision ID: 6708be958c07
Revises: 121c8c57b52a
Create Date: 2023-10-30 16:26:00.499936

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6708be958c07'
down_revision = '121c8c57b52a'
branch_labels = None
depends_on = None


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Quiz_QPA', schema=None) as batch_op:
        batch_op.add_column(sa.Column('problem', sa.String(length=400), nullable=True))
        batch_op.drop_column('question')

    # ### end Alembic commands ###


def downgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Quiz_QPA', schema=None) as batch_op:
        batch_op.add_column(sa.Column('question', sa.VARCHAR(length=400), nullable=True))
        batch_op.drop_column('problem')

    # ### end Alembic commands ###


def upgrade_prefixed():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade_prefixed():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###

